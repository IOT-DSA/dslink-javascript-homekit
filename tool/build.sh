#!/usr/bin/env bash
set -e
rm -rf .git
touch .buildscript
zip -r ../../files/dslink-javascript-homekit.zip *
