import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import fastifyCors from '@fastify/cors'

import { createGoalRoute } from '../routes/create-goal'
import { getWeekSummaryRoute } from '../routes/get-week-summary'
import { getPeddingGoalsRoute } from '../routes/get-pending-goals'
import { createCompletionRoute } from '../routes/create-completion'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalRoute)
app.register(getWeekSummaryRoute)
app.register(getPeddingGoalsRoute)
app.register(createCompletionRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running.')
  })
