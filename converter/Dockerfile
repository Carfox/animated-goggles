FROM python:3.10-slim

WORKDIR /app

COPY req.txt req.txt

RUN pip install --no-cache-dir -r req.txt

COPY . .

EXPOSE 6000

CMD ["python", "app.py"]
