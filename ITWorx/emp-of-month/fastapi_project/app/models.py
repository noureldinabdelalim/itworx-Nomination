class User(BaseModel):
    name: str
    email: str
    password: str

class Nominees(BaseModel):
    name: str
    email: str
    description: str
    votes: int

class Winners(BaseModel):
    name: str
    email: str
    year: int
    

class Result(BaseModel):
    winner: Winner
    nominees: List[Nominee]