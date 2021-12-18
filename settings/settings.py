import os
import json
import logging


class Settings:
    def __init__(self):
        self.dbuser = ""
        self.dbpassword = ""
        self.dbname = ""
        self.dbhost = ""

        if not os.path.exists("settings.json"):
            self._create_new_file()
        else:
            self._open_current_file()

    def _create_new_file(self):
        logging.info("Creating new settings.json")
        with open("settings.json", "w") as f:
            f.write(
                json.dumps({"dbhost": "", "dbuser": "", "dbpass": "", "dbname": ""})
            )
            f.close()
        raise FileNotFoundError("I can't find settings.json")

    def _open_current_file(self):
        with open("settings.json", "r") as f:
            file_content = f.read()
            file_data = json.loads(file_content)
            try:
                self.dbuser = file_data["dbuser"]
                self.dbpassword = file_data["dbpass"]
                self.dbhost = file_data["dbhost"]
                self.dbname = file_data["dbname"]
            except KeyError:
                raise KeyError(
                    "settings.json file is corrupted. Delete it and run api another time."
                )

    def get_db_user(self):
        return self.dbuser

    def get_db_host(self):
        return self.dbhost

    def get_db_password(self):
        return self.dbpassword

    def get_db_name(self):
        return self.dbname
