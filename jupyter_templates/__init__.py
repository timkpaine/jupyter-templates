# *****************************************************************************
#
# Copyright (c) 2024, the jupyter_templates authors.
#
# This file is part of the jupyter_templates library, distributed under the terms of
# the Apache License 2.0.  The full license can be found in the LICENSE file.
#
from .extension import load_jupyter_server_extension  # noqa: F401
from .nbextension import _jupyter_nbextension_paths

__version__ = "0.1.0"


def _jupyter_server_extension_paths():
    return [{"module": "jupyter_templates.extension"}]


def _jupyter_server_extension_points():
    return [{"module": "jupyter_templates.extension"}]
