import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as session from 'express-session'
import * as passport from 'passport'
import { createClient } from 'redis'

const RedisStore = require('connect-redis')(session)

async function bootstrap() {
  const redisClient = createClient({ legacyMode: true })
  redisClient.connect().catch(console.error)
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      store: new RedisStore({ client: redisClient }),
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 },
    }),
  )

  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(3000)
}
bootstrap()
