<img src="https://github.com/timkpaine/jupyter-templates/raw/main/docs/logo.png" width=400></img>

Support for notebook templates in jupyter and jupyterlab

[![Build Status](https://github.com/timkpaine/jupyter-templates/workflows/Build%20Status/badge.svg?branch=main)](https://github.com/timkpaine/jupyter-templates/actions?query=workflow%3A%22Build+Status%22)
[![codecov](https://codecov.io/gh/timkpaine/jupyter-templates/branch/main/graph/badge.svg)](https://codecov.io/gh/timkpaine/jupyter-templates)
[![PyPI](https://img.shields.io/pypi/l/jupyter-templates.svg)](https://pypi.python.org/pypi/jupyter-templates)
[![PyPI](https://img.shields.io/pypi/v/jupyter-templates.svg)](https://pypi.python.org/pypi/jupyter-templates)
[![npm](https://img.shields.io/npm/v/jupyter-templates.svg)](https://www.npmjs.com/package/jupyter-templates)
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/timkpaine/jupyter-templates/main?urlpath=lab)

![](https://raw.githubusercontent.com/timkpaine/jupyter-templates/main/docs/example1.gif)


## Install

### PyPI
`jupyter-templates` is available on [PyPI](https://pypi.org/project/jupyter-templates/):

```bash
pip install jupyter-templates
```

### Conda
`jupyter-templates` is also available on [conda-forge](https://github.com/conda-forge/jupyter-templates-feedstock):

```bash
conda install -c conda-forge jupyter-templates
```

### Jupyter Server/JupyterLab Extension
`jupyter-templates` is available as a prebuilt extension, so no further action should be necessary in JupyterLab.

To install it explicitly, run:

```bash
jupyter labextension install jupyter-templates
jupyter server extension enable --py jupyter-templates
```

For classic Notebook, run:

```bash
jupyter nbclassic-extension enable jupyter_templates/extension
```

## Adding templates
install the server extension, and add the following to `jupyter_notebook_config.py`

```python3
c.JupyterLabTemplates.allowed_extensions = ["*.ipynb"]
c.JupyterLabTemplates.template_dirs = ['list', 'of', 'template', 'directories']
c.JupyterLabTemplates.include_default = True
c.JupyterLabTemplates.include_core_paths = True
c.JupyterLabTemplates.template_label = "Template"
```

## Templates for libraries
The extension will search *subdirectories* of each parent directory specified in `template_dirs` for templates.
**Note!** Templates in the parent directories will be ignored. You must put the templates in *subdirectories*, in order to keep everything organized.

If `include_default = True` the `notebook_templates` directory under the [jupyter data folder](https://jupyter.readthedocs.io/en/latest/use/jupyter-directories.html) is one of the default parent directories. Thus, if you have tutorials or guides you'd like to install for users, simply copy them into your jupyter data folder inside the `notebook_templates` directory, e.g. `/usr/local/share/jupyter/notebook_templates/bqplot` for `bqplot`.

If you want to exclude templates from a specific directory, please add a file `.jupyter_templates_ignore` to to this location.
All notebooks in this directory will be ignored (but has no effect on subdirectories).

### Flags
- `allowed_extensions`: a list of extensions to allow templates for. (optional, default `["*.ipynb"]`)
- `template_dirs`: a list of absolute directory paths. All files matching `allowed_extensions` in any *subdirectories* of these paths will be listed as templates
- `include_default`: include the default Sample template (default True)
- `include_core_paths`: include jupyter core paths (see: jupyter --paths) (default True)
- `template_label`: set label for template UI icon (default "Template")



This software is licensed under the Apache 2.0 license. See the [LICENSE](LICENSE) file for details.
