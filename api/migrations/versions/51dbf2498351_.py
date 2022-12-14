"""empty message

Revision ID: 51dbf2498351
Revises: d0a036fdb94f
Create Date: 2022-11-29 07:25:11.998271

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '51dbf2498351'
down_revision = 'd0a036fdb94f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('img_url', sa.String(length=1000), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('img_url')

    # ### end Alembic commands ###
