
export const validateSchema = (schema) => (req, res, next) => {
  if (typeof req.body !== 'object' || req.body === null) {
    return res.status(400).json({
      error: ['Request body must be a valid JSON object']
    });
  }

  const result = schema.safeParse(req.body);

  if (!result.success) {
    const zodIssues = result?.error?.issues || result?.error?.errors || [];

    const errorMessages = zodIssues.map(issue => {
      const path = issue.path || [];
      const field = path.length ? path[0] : 'body';
      const receivedValue = req.body[field];

      if (issue.code === 'invalid_type') {
        if (receivedValue === undefined) {
          // Campo ausente
          if (field === 'username') return 'Username is required';
          if (field === 'email') return 'Email is required';
          if (field === 'password') return 'Password is required';
          if (field === 'title') return 'Title is required';
          if (field === 'description') return 'Description is required';
        } else {
          // Campo con tipo incorrecto (ej: username: 23)
          return `Expected ${issue.expected}, received ${typeof receivedValue}`;
        }
      } else if (issue.code === 'too_small' && field === 'username') {
        return 'Username cannot be empty';
      } else if (issue.code === 'invalid_string' && field === 'email') {
        return 'Invalid email';
      } else if (issue.code === 'too_small' && field === 'password') {
        return 'Password must be at least 6 characters';
      } else if (issue.code === 'invalid_string' && field === 'description') {
        return 'Description must be a string';
      }
      return issue.message;
    });

    return res.status(400).json({ error: errorMessages });
  }

  next();
};




/* export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ message: error.errors.map((error) => error.message) });
  }
};




*/