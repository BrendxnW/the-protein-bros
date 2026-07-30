import os
import mysql.connector


def connect():
    conn = mysql.connector.connect(
        host=os.getenv("DB_HOST", "http://127.0.0.1/"),
        port=int(os.getenv("DB_PORT", "5000")),
        user=os.getenv("DB_USER"),
        database=os.getenv("DB_NAME")
    )
    return conn