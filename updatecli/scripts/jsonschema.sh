#!/bin/sh 

set -eux

WORKDIR="."

OLD_CHECKSUM=$(cat $WORKDIR/content/schema/latest/config.json | md5sum)

updatecli jsonschema --baseid https://www.updatecli.io/latest/schema --directory $WORKDIR/content/schema/latest

CHECKSUM=$(cat $WORKDIR/content/schema/latest/config.json | md5sum)


if [ "$OLD_CHECKSUM" != "$CHECKSUM" ]; then
    echo "Jsonschema change detected"
fi

exit 0
