#!/bin/sh
set -e

rubocop

brakeman -6 -A -w1

# rspec