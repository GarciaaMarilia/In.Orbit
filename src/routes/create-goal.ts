import z from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { createGoal } from '../functions/create-goal'

export const createGoalRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/goals',
    {
      schema: {
        body: z.object({
          title: z.string(),
          desiredWeeklyFrequency: z.number().min(1).max(7),
        }),
      },
    },
    async request => {
      // essa rota vai fornecer a conexao para a funçao createGoal criar um goal no banco de dados
      const { title, desiredWeeklyFrequency } = request.body
      await createGoal({
        title: title,
        desiredWeeklyFrequency: desiredWeeklyFrequency,
      })
    }
  )
}
