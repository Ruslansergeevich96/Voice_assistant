const resolvers = {
  Query: {
    getTasks: async (_, __, { pool }) => {
      try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM tasks");
        client.release();
        return result.rows;
      } catch (error) {
        throw new Error(error);
      }
    },
    getTaskById: async (_, { id }, { pool }) => {
      try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM tasks WHERE id = $1", [
          id,
        ]);
        client.release();
        return result.rows[0];
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    createTask: async (_, { input }, { pool }) => {
      try {
        const client = await pool.connect();
        const result = await client.query(
          "INSERT INTO tasks (task_name, task_description, status) VALUES ($1, $2, $3) RETURNING *",
          [input.task_name, input.task_description, input.status]
        );
        client.release();
        return result.rows[0];
      } catch (error) {
        throw new Error(error);
      }
    },
    updateTask: async (_, { id, input }, { pool }) => {
      try {
        const client = await pool.connect();
        const result = await client.query(
          "UPDATE tasks SET task_name = $1, task_description = $2, status = $3 WHERE id = $4 RETURNING *",
          [input.task_name, input.task_description, input.status, id]
        );
        client.release();
        return result.rows[0];
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteTask: async (_, { id }, { pool }) => {
      try {
        const client = await pool.connect();
        const result = await client.query(
          "DELETE FROM tasks WHERE id = $1 RETURNING *",
          [id]
        );
        client.release();
        return result.rows[0];
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

module.exports = { resolvers };
