import enum

class Belt(enum.Enum):
   """
      Las cintas se organizan por pesos, siendo 1 Blanca y 7 Negra
   """
   WHITE = "Blanca"
   YELLOW = "Amarilla"
   ORANGE = "Naranja"
   GREEN = "Verde"
   BLUE = "Azul"
   RED = "Roja"
   BLACK = "Negra"
   
   @staticmethod
   def fetch_names():
      return [c.value for c in Belt]