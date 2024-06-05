def _jupyter_nbextension_paths():
    return [
        {
            "section": "tree",
            "src": "nbextension/static",
            "dest": "jupyter_templates",
            "require": "jupyter_templates/main",
        }
    ]
