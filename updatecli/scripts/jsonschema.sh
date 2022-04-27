#!/bin/sh 

set -eux

WORKDIR="."

OLD_CHECKSUM=$(wc -c < $WORKDIR/content/schema/latest/config.json)
#OLD_CHECKSUM=$(cat $WORKDIR/content/schema/latest/config.json | sha256sum)

updatecli jsonschema --baseid https://www.updatecli.io/latest/schema --directory $WORKDIR/content/schema/latest

#CHECKSUM=$(cat $WORKDIR/content/schema/latest/config.json | sha256sum)
CHECKSUM=$(wc -c < $WORKDIR/content/schema/latest/config.json)

if [ "$OLD_CHECKSUM" != "$CHECKSUM" ]; then
    echo "Jsonschema change detected"
fi

exit 0
