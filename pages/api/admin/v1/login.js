export default function handler(req, res) {
  res.status(200).json({
    "success": true,
    "data": {
      "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjg4MDUvYXBpL2FkbWluL3YxL2xvZ2luIiwiaWF0IjoxNjQ5MzM3MzQ5LCJuYmYiOjE2NDkzMzczNDksImp0aSI6IjlyVjFLQzlMdkRIbElNcjAiLCJzdWIiOiIxIiwicHJ2IjoiNWQ3YzZhZWM4OThhYzBjYzgxNWNiODkzMzc1NDU1ZDQ4MDgyMWFjYyJ9.TA21p3oU3zWi88oyu02afuFukfr5OlHNBspuIU7dq2I",
      "token_type": "bearer"
    },
    "notification": {
      "title": "Congratulation",
      "message": "Permintaan Anda berhasil"
    }
  })
}