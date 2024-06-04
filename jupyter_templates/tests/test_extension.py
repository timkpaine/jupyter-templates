# *****************************************************************************
#
# Copyright (c) 2024, the jupyter_templates authors.
#
# This file is part of the jupyter_templates library, distributed under the terms of
# the Apache License 2.0.  The full license can be found in the LICENSE file.
#
# for Coverage
from unittest.mock import MagicMock
from jupyter_templates.extension import load_jupyter_server_extension


class TestExtension:
    def test_load_jupyter_server_extension(self):
        m = MagicMock()

        m.web_app.settings = {}
        m.web_app.settings["base_url"] = "/test"
        load_jupyter_server_extension(m)
