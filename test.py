from unittest import TestCase
from app import app
from flask import session 
from boggle import Boggle

class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!

    def test_display_board(self):
        with app.test_client() as client:
            resp = client.get('/')
            print(resp.status_code)
            self.assertEqual(resp.status_code, 200)

    def test_keep_score(self):
        with app.test_client() as client:
            resp = client.post('/score', data = {'hi_score':20})
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('All Time High Score: 20', html)



