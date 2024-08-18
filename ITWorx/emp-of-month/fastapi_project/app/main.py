from fastapi import FastAPI, Request, Response , HTTPException
from fastapi.responses import HTMLResponse
from fastapi.requests import Request
from fastapi.security.utils import get_authorization_scheme_param
from fastapi.security import OAuth2PasswordBearer, OAuth2
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.openapi.utils import get_openapi
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from typing import List, Optional
from models import Login, GetType
from dbAccess import get_user_by_email
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Nominees, db

app = FastAPI()



@app.post("/login")
async def login_user(login: Login):
    user = await get_user_by_email(login.email)
    if not user:
        return JSONResponse(content={"error": "Invalid email or password"}, status_code=401)
    if not (login.password == user.password):
        return JSONResponse(content={"error": "Invalid email or password"}, status_code=401)
    # access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    # access_token = create_access_token(
    #     data={"sub": user.email}, expires_delta=access_token_expires
    # )
    # return JSONResponse(content={"access_token": access_token, "token_type": "bearer"}, status_code=200)
    return JSONResponse(message={"user.role"}, status_code=200)



@app.post("/add_nominee")
async def add_nominee(nominee: Nominees):
    engine = create_engine()
    Session = sessionmaker(bind=engine)
    session = Session()

    try:
        
        existing_nominee = session.query(nominee).filter(nominee.name == nominee.name).first()
        if existing_nominee:
            raise HTTPException(status_code=400, detail="Nominee already exists")

        session.add(nominee)
        session.commit()
        return JSONResponse(content={"message": "Nominee added successfully"}, status_code=201)
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        session.close()
        return JSONResponse(content={"message": "Nominee added successfully"}, status_code=201)

@app.get("/view_nominees")
async def view_nominees():
    # implement view nominees logic here
    nominees = [...]  # retrieve list of nominees from database
    return JSONResponse(content={"nominees": nominees}, status_code=200)

@app.get("/view_previous_winners")
async def view_previous_winners():
    # implement view previous winners logic here
    winners = [...]  # retrieve list of previous winners from database
    return JSONResponse(content={"winners": winners}, status_code=200)

@app.get("/view_nominee_profile/{nominee_id}")
async def view_nominee_profile(nominee_id: int):
    # implement view nominee profile logic here
    nominee_profile = (...)  # retrieve nominee profile from database
    return JSONResponse(content={"nominee_profile": nominee_profile}, status_code=200)

@app.get("/view_results")
async def view_results():
    # implement view results logic here
    result = (...)  # retrieve result from database
    return JSONResponse(content={"result": result}, status_code=200)

@app.post("/end_voting")
async def end_voting():
    # implement end voting logic here
    return JSONResponse(content={"message": "Voting has ended"}, status_code=200)

@app.post("/logout")
async def logout():
    # implement logout logic here
    return JSONResponse(content={"message": "Logged out successfully"}, status_code=200)
