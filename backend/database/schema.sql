-- 1. Enable generation of 128-bit UUID 
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create 'schools' Table
CREATE TABLE schools 
(
    -- Generate 128-bit UUID
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_name VARCHAR(255) NOT NULL,
    license_status VARCHAR(50) NOT NULL DEFAULT 'Active'
);

-- 3. Create 'profiles' Table
CREATE TABLE profiles 
(
    -- Link profiles.id to auth.users(id)
    -- ON DELETE CASCADE wipes profile and quiz score of student if needed
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username VARCHAR(100) NOT NULL UNIQUE,
    year_group INT NOT NULL,
    -- Prevent school account being deleted if active studnet profile still attached
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE RESTRICT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create 'quizzes' Table
CREATE TABLE quizzes
(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject VARCHAR(100) NOT NULL,
    topic VARCHAR(100) NOT NULL
);

-- 5. Create 'quiz_scores' Table
CREATE TABLE quiz_scores
(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    -- Reject invalid data
    score INT NOT NULL CHECK (score >= 0 AND score <= 100),
    time_taken_seconds FLOAT NOT NULL CHECK (time_taken_seconds > 0),
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);