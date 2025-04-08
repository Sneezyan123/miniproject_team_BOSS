import uvicorn
from fastapi import FastAPI
from database.database import engine, Base
from routers import user_router
from contextlib import asynccontextmanager
app = FastAPI()
@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(lifespan=lifespan)
app.include_router(user_router.router, prefix="/user")
if __name__ == "__main__":
    uvicorn.run("main:app", host = "0.0.0.0", port = 8000, reload=True, workers=1)
