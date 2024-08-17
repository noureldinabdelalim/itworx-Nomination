import psycopg2
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

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
#if using object relational mapping
Base = declarative_base()


class Employee(Base):
    __tablename__ = 'Employee'

    userid = Column(Integer, primary_key=True)
    email = Column(String(25), unique=True, nullable=False)
    password = Column(String(25), nullable=False)
    name = Column(String(25), nullable=False)
    isadmin = Column(Boolean, default=False)

class Votings(Base):
    __tablename__ = 'votings'

    voterid = Column(Integer, ForeignKey('Employee.userid'), primary_key=True)
    votedid = Column(Integer, ForeignKey('Employee.userid'), primary_key=True)
    month = Column(Integer, primary_key=True)
    numberofvotes = Column(Integer, default=0)

    voter = relationship("Employee", foreign_keys=[voterid])
    voted = relationship("Employee", foreign_keys=[votedid])

    __table_args__ = (UniqueConstraint('voterid', 'month', name='_voter_month_uc'),)

class ResultOfMonth(Base):
    __tablename__ = 'result of month'

    userid = Column(Integer, ForeignKey('Employee.userid'), primary_key=True)
    month = Column(Integer, primary_key=True)
    name = Column(String(25), nullable=False)

    employee = relationship("Employee")

class Nominations(Base):
    __tablename__ = 'nominations'

    userid = Column(Integer, ForeignKey('Employee.userid'), primary_key=True)
    nomineemail = Column(String(25), ForeignKey('Employee.email'), primary_key=True)
    reason = Column(String(25), nullable=False)
    month = Column(Integer, primary_key=True)
    useremail = Column(String(25), ForeignKey('Employee.email'))

    user = relationship("Employee", foreign_keys=[userid])
    nominee = relationship("Employee", foreign_keys=[nomineemail])
    user_email_relation = relationship("Employee", foreign_keys=[useremail])

"""
def check_nominations_limit(session, new_nomination):
     
        count = session.query(Nominations).filter_by(userid=new_nomination.userid, month=new_nomination.month).count()
        if count >= 3:
            raise ValueError('A user can nominate only 3 times per month.')
        return new_nomination
"""
engine = create_engine('postgresql://postgres:Plm!@123@localhost:5432/empofmonth')
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()



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