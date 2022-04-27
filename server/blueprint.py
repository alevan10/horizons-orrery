from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.staticfiles import StaticFiles

app = FastAPI()

origins = [
    "http://localhost:8080",
    "localhost:8080",
    "http://levan.home",
    "https://levan.home",
    "https://andrewlevan.com"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.mount("/", StaticFiles(directory="/dist", html=True), name="static")
