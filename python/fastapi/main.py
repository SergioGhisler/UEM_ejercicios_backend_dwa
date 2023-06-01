from fastapi import Request, FastAPI
import mysql.connector
app = FastAPI()

def make_connection():
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        database="productos"
    )
    return mydb
@app.get("/")
def hola_mundo():
    return {"message": "Hola mundo"}

@app.get("/productos")
def get_productos():
    mydb = make_connection()
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM productos_producto")
    myresult = mycursor.fetchall()
    return myresult

@app.post("/productos")
async def add_productos(request: Request):
    mydb = make_connection()
    mycursor = mydb.cursor()
    data = await request.json()
    nombre = data['nombre']
    precio = data['precio']
    descripcion = data['descripcion']      
    mycursor.execute(f"INSERT INTO productos_producto (nombre, precio, descripcion) VALUES ('{nombre}', {precio}, '{descripcion}');")
    mydb.commit()
    print('todo bien')
    return {"message": "Producto agregado", "data": data}

