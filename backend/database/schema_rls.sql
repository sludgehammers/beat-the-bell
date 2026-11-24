-- 1. Enable RLS and Policies for 'profiles'
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own profile"
ON profiles FOR SELECT
-- Restrict access so studnets can query or alter their own row
USING (auth.uid() = id);

CREATE POLICY "Students can update their own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Teacher can view student profiles in their classes"
ON profiles FOR SELECT
USING (
    EXISTS (
        SELECT 1
        FROM class_enrollments ce
        JOIN classes c ON ce.class_id = c.id
        WHERE ce.student_id = profiles.id
        AND c.teacher_id = auth.uid()
    )
);

-- 2. Enable RLS and Policies for 'classes'
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers can view their own classes"
ON classes FOR ALL
USING (auth.uid() = teacher_id)
WITH CHECK (auth.uid() = teacher_id);

CREATE POLICY "Students can view classes they are enrolled in"
ON classes FOR SELECT
USING (
    EXISTS (
        SELECT 1
        FROM class_enrollments ce
        WHERE ce.class_id = classes.id
        AND ce.student_id = auth.uid()
    )
);

-- 3. Enable RLS and Policies for 'class_enrollments'
ALTER TABLE class_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view and their own enrollments"
ON class_enrollments FOR SELECT
USING (auth.uid() = student_id);

CREATE POLICY "Students can enroll themselves in classes"
ON class_enrollments FOR INSERT
WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Teachers can view enrollments for their classes"
ON class_enrollments FOR SELECT
USING (
    EXISTS (
        SELECT 1
        FROM classes c
        WHERE c.id = class_enrollments.class_id
        AND c.teacher_id = auth.uid()
    )
);

-- 4. Enable RLS and Policies for 'character_customisations'
ALTER TABLE character_customisations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own character customisations"
ON character_customisations FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Students can update their own character customisations"
ON character_customisations FOR UPDATE
USING (auth.uid() = user_id);

-- 5. Enable RLS and Policies for 'quiz_scores'
ALTER TABLE quiz_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own scores"
ON quiz_scores FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Students can insert their own scores"
ON quiz_scores FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Teachers can view scores for their classes"
ON quiz_scores FOR SELECT
USING (
    EXISTS (
        SELECT 1
        FROM class_enrollments ce
        JOIN classes c ON ce.class_id = c.id
        WHERE ce.student_id = quiz_scores.user_id
        AND c.teacher_id = auth.uid()
    )
);