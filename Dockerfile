FROM node:17.9 as Builder

COPY . /orrery/

WORKDIR /orrery
RUN npm install
RUN npm run build

FROM python:3.9.12-slim

COPY --from=Builder /orrery/dist /dist
COPY --from=Builder /orrery/server /server
WORKDIR /server
RUN pip install poetry;\
    poetry config virtualenvs.create false && poetry install -v --no-dev
CMD ["uvicorn", "blueprint:app", "--host", "0.0.0.0", "--port", "8080"]
