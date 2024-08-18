#import psycopg2
from sqlalchemy import create_engine, Column, Integer, String, Numeric, Boolean, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from urllib.parse import quote_plus

Base = declarative_base()
#if using object relational mapping
#Base = declarative_base()


class Employee(Base):
    __tablename__ = 'Employee'

    userid = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(25), unique=True, nullable=False)
    password = Column(String(25), nullable=False)
    name = Column(String(25), nullable=False)
    isadmin = Column(Boolean, default=False)
    voted = Column(Boolean, default=False)
    nominations = Column(Integer, default=3)

    def __repr__(self) -> str:
        return (f"<Employee userid: {self.userid}, name: {self.name}, email: {self.email}, "
                f"isadmin: {self.isadmin}, voted: {self.voted}, nominations: {self.nominations}>")

class Votings(Base):
    __tablename__ = 'votings'

    votedid = Column(Integer, ForeignKey('Employee.userid'), primary_key=True)
    month = Column(Integer, primary_key=True)
    numberofvotes = Column(Integer, default=0)
    voted = relationship("Employee", foreign_keys=[votedid])

    def __repr__(self) -> str:
        return (f"<Votings votedid: {self.votedid}, month: {self.month}, "
                f"numberofvotes: {self.numberofvotes}>")

class ResultOfMonth(Base):
    __tablename__ = 'resultofmonth'

    userid = Column(Integer, ForeignKey('Employee.userid'), primary_key=True)
    month = Column(Integer, primary_key=True)
    name = Column(String(25), nullable=False)

    employee = relationship("Employee")

    def __repr__(self) -> str:
        return (f"<ResultOfMonth userid: {self.userid}, month: {self.month}, "
                f"name: {self.name}>")

class Nominations(Base):
    __tablename__ = 'nominations'

    nomineemail = Column(String(25), ForeignKey('Employee.email'), primary_key=True)
    reason = Column(String(25), nullable=False)
    month = Column(Integer, primary_key=True)

    nominee = relationship("Employee", foreign_keys=[nomineemail])

    def __repr__(self) -> str:
        return (f"<Nominations nomineemail: {self.nomineemail}, month: {self.month}, "
                f"reason: {self.reason}>")




engine = create_engine("postgresql+psycopg2://postgres:Plm%21%40123@localhost:5432/empdatabase")

Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()
employee1 = Employee(
    email="john.doe@example.com",
    password="securepassword",
    name="John Doe",
    isadmin=True,
    voted=False,
    nominations=3
)
session.add(employee1)
session.commit()
session.close()



