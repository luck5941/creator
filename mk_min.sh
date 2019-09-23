#!/bin/bash
set -x

cat js/creator_core.js \
    node/creator_node.js > node/min.creator_node.js

cat js/creator_core.js \
    js/creator_ui.js \
    js/app.js \
    js/buttons_actions.js > js/min.creator_web.js

