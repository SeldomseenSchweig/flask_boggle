from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!

    def test_display_board(self):
        with app.test_client() as client:
            resp = client.get('/')
            self.assertEqual(resp.status_code, 200)

    def test_keep_score(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['hi_score'] = 10
                change_session['number_of_games'] = 10

            resp = client.post('/score', data = '{"points":20}')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn( '"hi_score": 20', html)

    def test_check_word(self):
        """Could not build random board, hard coded one in to get test to work consistently"""
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['game_board'] = [['S', 'V', 'N', 'L', 'A'],['R', 'V', 'J', 'R', 'P'],['R', 'R', 'B', 'W', 'J'],['S', 'N', 'Y', 'Y', 'Q'],['V', 'K', 'B', 'U', 'V']]

            resp = client.post('/check-word', data = '{"word":"a"}')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn( '"result": "ok', html)


    


