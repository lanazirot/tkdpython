"""empty message

Revision ID: f6ceb8e59edc
Revises: 51dbf2498351
Create Date: 2022-12-01 01:01:13.496670

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f6ceb8e59edc'
down_revision = '51dbf2498351'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('students')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('students',
    sa.Column('id', sa.INTEGER(), sa.Identity(always=False, start=1, increment=1), autoincrement=True, nullable=False),
    sa.Column('user_uuid', sa.VARCHAR(length=255, collation='SQL_Latin1_General_CP1_CI_AS'), autoincrement=False, nullable=True),
    sa.Column('belt_color', sa.VARCHAR(length=50, collation='SQL_Latin1_General_CP1_CI_AS'), autoincrement=False, nullable=False),
    sa.Column('age', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('birth_date', sa.DATETIME(), autoincrement=False, nullable=False),
    sa.Column('weight', sa.FLOAT(precision=53), autoincrement=False, nullable=False),
    sa.Column('professor_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('next_belt_change', sa.DATETIME(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['professor_id'], ['professors.id'], name='FK__students__profes__75A278F5'),
    sa.ForeignKeyConstraint(['user_uuid'], ['users.uuid'], name='FK__students__user_u__76969D2E'),
    sa.PrimaryKeyConstraint('id', name='PK__students__3213E83F5F7B10C4')
    )
    # ### end Alembic commands ###