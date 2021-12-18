import fastapi
import repository
import settings

app = fastapi.FastAPI()
sett = settings.Settings()
db = repository.DatabaseRepository(
    dbhost=sett.dbhost, dbuser=sett.dbuser, dbpass=sett.dbpassword, dbname=sett.dbname
)
