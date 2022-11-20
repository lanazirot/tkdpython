"""empty message

Revision ID: f55939f1525f
Revises: dbbc452b38d8
Create Date: 2022-11-20 14:14:21.880120

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f55939f1525f'
down_revision = 'dbbc452b38d8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('judges',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_uuid', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_uuid'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('personnel',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_uuid', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_uuid'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('professors',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_uuid', sa.Integer(), nullable=True),
    sa.Column('belt_color', sa.Enum('Blanca', 'Amarilla', 'Naranja', 'Verde', 'Azul', 'Roja', 'Negra', name='belt'), server_default='Negra', nullable=True),
    sa.Column('age', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_uuid'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('students',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_uuid', sa.Integer(), nullable=True),
    sa.Column('belt_color', sa.Enum('Blanca', 'Amarilla', 'Naranja', 'Verde', 'Azul', 'Roja', 'Negra', name='belt'), server_default='Blanca', nullable=True),
    sa.Column('age', sa.Integer(), nullable=False),
    sa.Column('birth_date', sa.DateTime(), nullable=False),
    sa.Column('weight', sa.Float(), nullable=False),
    sa.Column('professor_id', sa.Integer(), nullable=True),
    sa.Column('next_belt_change', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['professor_id'], ['professors.id'], ),
    sa.ForeignKeyConstraint(['user_uuid'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('students')
    op.drop_table('professors')
    op.drop_table('personnel')
    op.drop_table('judges')
    # ### end Alembic commands ###