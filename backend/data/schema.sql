-- Enable Row Level Security
ALTER DATABASE postgres SET row_security = on;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    partner_id UUID REFERENCES users(id),
    partner_code TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create baby_names table
CREATE TABLE IF NOT EXISTS baby_names (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    gender TEXT NOT NULL CHECK (gender IN ('boy', 'girl', 'neutral')),
    origin TEXT NOT NULL,
    meaning TEXT NOT NULL,
    popularity INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_swipes table
CREATE TABLE IF NOT EXISTS user_swipes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    name_id UUID REFERENCES baby_names(id) ON DELETE CASCADE NOT NULL,
    is_like BOOLEAN NOT NULL,
    swiped_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, name_id)
);

-- Create matches table
CREATE TABLE IF NOT EXISTS matches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name_id UUID REFERENCES baby_names(id) ON DELETE CASCADE NOT NULL,
    user1_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    user2_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(name_id, user1_id, user2_id)
);

-- Create partner_invites table
CREATE TABLE IF NOT EXISTS partner_invites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    invite_code TEXT UNIQUE NOT NULL,
    inviter_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    inviter_email TEXT NOT NULL,
    inviter_name TEXT NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_partner_id ON users(partner_id);
CREATE INDEX IF NOT EXISTS idx_users_partner_code ON users(partner_code);
CREATE INDEX IF NOT EXISTS idx_baby_names_gender ON baby_names(gender);
CREATE INDEX IF NOT EXISTS idx_baby_names_popularity ON baby_names(popularity DESC);
CREATE INDEX IF NOT EXISTS idx_baby_names_name ON baby_names(name);
CREATE INDEX IF NOT EXISTS idx_user_swipes_user_id ON user_swipes(user_id);
CREATE INDEX IF NOT EXISTS idx_user_swipes_name_id ON user_swipes(name_id);
CREATE INDEX IF NOT EXISTS idx_user_swipes_is_like ON user_swipes(is_like);
CREATE INDEX IF NOT EXISTS idx_matches_name_id ON matches(name_id);
CREATE INDEX IF NOT EXISTS idx_matches_user1_id ON matches(user1_id);
CREATE INDEX IF NOT EXISTS idx_matches_user2_id ON matches(user2_id);
CREATE INDEX IF NOT EXISTS idx_partner_invites_code ON partner_invites(invite_code);
CREATE INDEX IF NOT EXISTS idx_partner_invites_inviter ON partner_invites(inviter_id);
CREATE INDEX IF NOT EXISTS idx_partner_invites_used ON partner_invites(used);

-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE baby_names ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_swipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_invites ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for baby_names table (everyone can read)
CREATE POLICY "Anyone can view baby names" ON baby_names
    FOR SELECT USING (true);

-- RLS Policies for user_swipes table
CREATE POLICY "Users can view their own swipes" ON user_swipes
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own swipes" ON user_swipes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own swipes" ON user_swipes
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own swipes" ON user_swipes
    FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for matches table
CREATE POLICY "Users can view their own matches" ON matches
    FOR SELECT USING (auth.uid() = user1_id OR auth.uid() = user2_id);

CREATE POLICY "Users can insert matches they're part of" ON matches
    FOR INSERT WITH CHECK (auth.uid() = user1_id OR auth.uid() = user2_id);

CREATE POLICY "Users can update their own matches" ON matches
    FOR UPDATE USING (auth.uid() = user1_id OR auth.uid() = user2_id);

CREATE POLICY "Users can delete their own matches" ON matches
    FOR DELETE USING (auth.uid() = user1_id OR auth.uid() = user2_id);

-- RLS Policies for partner_invites table
CREATE POLICY "Users can view invites they created" ON partner_invites
    FOR SELECT USING (auth.uid() = inviter_id);

CREATE POLICY "Anyone can view unused invites for accepting" ON partner_invites
    FOR SELECT USING (used = false AND expires_at > NOW());

CREATE POLICY "Users can create their own invites" ON partner_invites
    FOR INSERT WITH CHECK (auth.uid() = inviter_id);

CREATE POLICY "Users can update their own invites" ON partner_invites
    FOR UPDATE USING (auth.uid() = inviter_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_matches_updated_at BEFORE UPDATE ON matches
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to generate unique partner codes
CREATE OR REPLACE FUNCTION generate_partner_code()
RETURNS TEXT AS $$
DECLARE
    code TEXT;
    exists_check BOOLEAN;
BEGIN
    LOOP
        code := upper(substring(encode(gen_random_bytes(3), 'base64') from 1 for 6));
        -- Remove problematic characters
        code := replace(replace(replace(code, '+', ''), '/', ''), '=', '');
        
        -- Check if code already exists
        SELECT EXISTS(SELECT 1 FROM users WHERE partner_code = code) INTO exists_check;
        
        IF NOT exists_check THEN
            RETURN code;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;