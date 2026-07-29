import os
import mysql.connector


def connect():
    conn = mysql.connector.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=int(os.getenv("DB_PORT", "3306")),
        user=os.getenv("DB_USER"),
        database=os.getenv("DB_NAME")
    )
    return conn