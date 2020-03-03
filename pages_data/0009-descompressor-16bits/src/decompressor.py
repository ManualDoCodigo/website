# Implementado por Douglas Diniz
# www.manualdocodigo.com.br
# github.com/manualdocodigo
# 03/03/2020


class Decompressor:
    def __init__(self): 
        pass

    def decompress(self, compressed, file_name):
        cpos = 2
        decompressed = bytearray()

        while cpos < len(compressed)-1:
            control = compressed[cpos]
            cpos += 1

            if control & 0x80:
                #bit 7

                counter = ((control & 0x60) >> 5) + 4

                offset_to_back = ((control & 0x1f) << 8) | compressed[cpos]
                offset = len(decompressed) - offset_to_back 
                cpos += 1

                for i in range(counter):
                    decompressed.append(decompressed[offset])
                    offset += 1

                while compressed[cpos] & 0xe0 == 0x60:

                    if cpos > len(compressed) -1 :
                        break

                    counter = compressed[cpos] & 0x1f
                    cpos += 1

                    for i in range(counter):
                        decompressed.append(decompressed[offset])
                        offset += 1
                
            elif control & 0x40:
                #bit 6
                counter = control & 0xf

                if control & 0x10: 
                    counter = (counter << 8) | compressed[cpos]
                    cpos += 1
                
                counter += 4

                byte_to_repeat = compressed[cpos]
                cpos += 1

                for i in range(counter):
                    decompressed.append(byte_to_repeat)

            else:
                #bit 5                
                counter = control & 0x1f

                if control & 0x20: 
                    counter = (counter << 8) | compressed[cpos]
                    cpos += 1

                decompressed += compressed[cpos:cpos+int(counter)]
                cpos += int(counter)

        f = open(file_name, 'w+b')
        f.write(decompressed)

        return decompressed
                


if __name__ == "__main__":

    decomp16bits = Decompressor()

    graph = open("grafico_comprimido.smd", "rb").read()

    decomp16bits.decompress(graph, "graph.smd")

