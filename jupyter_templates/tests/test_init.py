# *****************************************************************************
#
# Copyright (c) 2024, the jupyter_templates authors.
#
# This file is part of the jupyter_templates library, distributed under the terms of
# the Apache License 2.0.  The full license can be found in the LICENSE file.
#
# for Coverage
from jupyter_templates import _jupyter_server_extension_paths


class TestInit:
    def test__jupyter_server_extension_paths(self):
        assert _jupyter_server_extension_paths() == [{"module": "jupyter_templates.extension"}]
