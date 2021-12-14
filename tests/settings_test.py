import os
import unittest
import json
from settings import Settings

class TestSettings(unittest.TestCase):
    def setUp(self):
        try:
            os.mkdir("/tmp/settings_test")
        except:
            pass
        os.chdir("/tmp/settings_test")
        if os.path.exists("/tmp/settings_test/settings.json"):
            os.remove("/tmp/settings_test/settings.json")
    
    def test_file_not_found(self):
        self.assertRaises(FileNotFoundError, lambda: Settings())
        self.assertTrue(os.path.exists("/tmp/settings_test/settings.json"))
        self.assertGreater( len(open("./settings.json", "r").read()), 0)

    def test_reading_file_content(self):
        if os.path.exists("./settings.json"):
            os.remove("./settings.json")
        
        with open("./settings.json", "w") as f:
            f.write(json.dumps({
                "dbhost": "testHost",
                "dbuser": "testUser",
                "dbpass": "testPass",
                "dbname": "testName"
            }))

        settings = Settings()

        self.assertEqual(settings.dbname, "testName")
        self.assertEqual(settings.dbuser, "testUser")
        self.assertEqual(settings.dbhost, "testHost")
        self.assertEqual(settings.dbpassword, "testPass")