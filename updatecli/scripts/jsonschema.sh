#!/bin/sh 

set -eux

WORKDIR="."

OLD_CHECKSUM=$(wc -c < $WORKDIR/content/schema/latest/config.json)

updatecli jsonschema --baseid https://www.updatecli.io/latest/schema --directory $WORKDIR/content/en/schema/latest

CHECKSUM=$(wc -c < $WORKDIR/content/schema/latest/config.json)

if [ "$OLD_CHECKSUM" != "$CHECKSUM" ]; then
    echo "Jsonschema change detected"
fi

exit 0
