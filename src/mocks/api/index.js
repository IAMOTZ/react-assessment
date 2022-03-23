import { rest, setupWorker } from 'msw';
import data from './data.json';

const getUsers = (req, res, ctx) => {
  const limit = Number(req.url.searchParams?.get('limit')) || 20;
  const offset = Number(req.url.searchParams?.get('offset')) || 0;

  const paginatedData = data.slice(offset, offset + limit);

  return res(
    ctx.status(200),
    ctx.json({
      message: 'Fetch users successful',
      users: paginatedData,
      paginationInfo: {
        limit,
        offset,
        total: data.length
      }
    })
  )
};

const updateUser = (req, res, ctx) => {
  const userId = req.params.userId;
  const user = data.find(usr => usr.id === userId);

  if (!user) {
    return res(
      ctx.status(404),
      ctx.json({
        message: 'User not found',
      })
    )
  }

  user.first_name = req.body.first_name || user.first_name;
  user.last_name = req.body.last_name || user.last_name;
  user.email = req.body.email || user.email;

  return res(
    ctx.status(200),
    ctx.json({
      message: 'User updated successfully',
    })
  )
}

const deleteUser = (req, res, ctx) => {
  const userId = req.params.userId;
  const userIndex = data.findIndex(usr => usr.id === userId);

  if (userIndex < 1) {
    return res(
      ctx.status(404),
      ctx.json({
        message: 'User not found',
      })
    )
  }

  data.splice(userIndex, 1);

  return res(
    ctx.status(200),
    ctx.json({
      message: 'User deleted successfully',
    })
  )
}


export const setupApiMocking = () => {
  const worker = setupWorker(
    rest.get('/users', getUsers),
    rest.put('/users/:userId', updateUser),
    rest.delete('/users/:userId', deleteUser),
  )
  worker.start();
}
