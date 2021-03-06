from contextlib import suppress

from django.apps import AppConfig


class CommonConfig(AppConfig):
    name = 'pretalx.common'

    def ready(self):
        from pretalx.event.models import Event
        from django.db import connection
        from . import signals  # noqa

        if Event._meta.db_table not in connection.introspection.table_names():
            # commands like `compilemessages` execute ready(), but do not
            # require a database to be present. Bail out early, if the Event
            # table has not been created yet.
            return
        # TODO: Add more startup checks here – but do not run regenerate_css anymore


with suppress(ImportError):
    import pretalx.celery_app as celery  # NOQA

default_app_config = 'pretalx.common.CommonConfig'
