import { BlockCard } from "../../components/BlockCard";

export const ListBlock = () => {
  // Simulación de bloques en la blockchain
  const blocks = [
    {
      index: 1,
      hash: "0000a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
      previousHash: "0".repeat(64),
      data: "Bloque inicial",
    },
    {
      index: 2,
      hash: "0000b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0",
      previousHash: "0000a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
      data: "Transacción: Alice envió 10 BTC a Bob",
    },
    {
      index: 3,
      hash: "0000c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0",
      previousHash: "0000b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0",
      data: "Transacción: Bob envió 5 BTC a Charlie",
    },
  ];

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold"> Listando Bloques</h1>
        <p className="text-muted">
          Esta página muestra una lista de bloques simulados en la cadena de bloques.
        </p>
      </div>

      <h3 className="mb-4 text-center text-primary"> Cadenas Blockchain</h3>

      <div className="d-flex flex-column align-items-center">
        {blocks.map((block, idx) => (
          <BlockCard
            key={block.index}
            index={block.index}
            hash={block.hash}
            previousHash={block.previousHash}
            data={block.data}
            showArrow={idx < blocks.length - 1}
          />
        ))}
      </div>
    </div>
  );
};
