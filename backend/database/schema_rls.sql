-- 1. Enable RLS and Policies for 'profiles'
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own profile"
ON profiles FOR SELECT
-- Restrict access so studnets can query or alter their own row
USING (auth.uid() = id);

CREATE POLICY "Students can update their own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

-- 2. Enable RLS and Policies for 'quiz_scores'
ALTER TABLE quiz_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own scores"
ON quiz_scores FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Students can update their own scores"
ON quiz_scores FOR INSERT
WITH CHECK (auth.uid() = user_id);