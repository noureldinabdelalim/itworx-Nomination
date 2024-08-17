#import psycopg2
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


#if using object relational mapping
Base = declarative_base()


class Employee(Base):
    __tablename__ = 'Employee'

    userid = Column(Integer, primary_key=True)
    email = Column(String(25), unique=True, nullable=False)
    password = Column(String(25), nullable=False)
    name = Column(String(25), nullable=False)
    isadmin = Column(Boolean, default=False)
    voted = Column(Boolean, default=False)
    nominations = Column(Integer, default=3)

class Votings(Base):
    __tablename__ = 'votings'

    votedid = Column(Integer, ForeignKey('Employee.userid'), primary_key=True)
    month = Column(Integer, primary_key=True)
    numberofvotes = Column(Integer, default=0)
    voted = relationship("Employee", foreign_keys=[votedid])

class ResultOfMonth(Base):
    __tablename__ = 'result of month'

    userid = Column(Integer, ForeignKey('Employee.userid'), primary_key=True)
    month = Column(Integer, primary_key=True)
    name = Column(String(25), nullable=False)

    employee = relationship("Employee")

class Nominations(Base):
    __tablename__ = 'nominations'

    nomineemail = Column(String(25), ForeignKey('Employee.email'), primary_key=True)
    reason = Column(String(25), nullable=False)
    month = Column(Integer, primary_key=True)

    nominee = relationship("Employee", foreign_keys=[nomineemail])


engine = create_engine('postgresql://postgres:Plm!@123@localhost:5432/empofmonth')
Base.metadata.create_all(engine)

try:
    # Connect to the database
    connection = engine.connect()
    print("Connection to the database was successful.")
    connection.close()
except Exception as e:
    print(f"Error connecting to the database: {e}")


inspector = inspect(engine)
tables = inspector.get_table_names()
print("Tables in the database:", tables)

Session = sessionmaker(bind=engine)
session = Session()

try:
    new_employee = Employee(
        userid=1,
        email="test@example.com",
        password="password123",
        name="Test User"
    )
    session.add(new_employee)
    session.commit()
    print("Employee added successfully.")

    # Query the employee
    queried_employee = session.query(Employee).filter_by(userid=1).first()
    if queried_employee:
        print(f"Queried Employee: {queried_employee.name}, {queried_employee.email}")

except Exception as e:
    print(f"Error during database operations: {e}")

finally:
    session.close()


"""
#if not using orm
try:   
    connection = psycopg2.connect(
        host="localhost", 
        database="empofmonth.sql", 
        user="postgres",  
        password="Plm!@123",
        port='5432' 
    )

    cursor = connection.cursor()
       # Print PostgreSQL Connection properties
    print(connection.get_dsn_parameters(), "\n")

    # Execute a SQL query to check connection
    cursor.execute("SELECT version();")
    
    # Fetch and display the result
    record = cursor.fetchone()
    print("You are connected to - ", record, "\n")

except Exception as error:
    print("Error while connecting to PostgreSQL", error)

finally:
    if connection:
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")
"""
"""
class User(Base):
    name: str
    email: str
    password: str

class Nominees(Base):
    name: str
    email: str
    description: str
    votes: int

class Winners(Base):
    name: str
    email: str
    year: int
    

class Result(Base):
    winner: Winner
    nominees: List[Nominee]
"""