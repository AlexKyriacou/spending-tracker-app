import os
import psycopg2
from psycopg2 import OperationalError

def test_database_connection():
    try:
        # Retrieve database connection details from environment variables
        db_user = os.environ.get("DB_USER")
        db_password = os.environ.get("DB_PASSWORD")
        db_host = "localhost"
        db_port = os.environ.get("DB_PORT")
        db_name = os.environ.get("DB_NAME")

        # Establish a connection to the PostgreSQL database
        connection = psycopg2.connect(
            user=db_user,
            password=db_password,
            host=db_host,
            port=db_port,
            database=db_name
        )

        # Execute a simple query to check the connection
        cursor = connection.cursor()
        cursor.execute("SELECT 1;")
        result = cursor.fetchone()

        print("Database is up and running!")
        print("Result of SELECT 1 query:", result)

    except OperationalError as e:
        print("Error:", e)
        print("Database is not running or credentials are incorrect.")

    finally:
        # Close the connection in all cases
        if connection:
            connection.close()
            print("Connection closed.")

if __name__ == "__main__":
    test_database_connection()
