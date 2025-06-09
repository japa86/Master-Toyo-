import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

export default function MasterToyoSystem() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [form, setForm] = useState({ name: '', base: '', cost: '', price: '', quantity: '' });
  const [saleForm, setSaleForm] = useState({ name: '', quantity: '' });

  const addProduct = () => {
    setProducts([...products, { ...form, id: Date.now(), quantity: parseInt(form.quantity) }]);
    setForm({ name: '', base: '', cost: '', price: '', quantity: '' });
  };

  const sellProduct = () => {
    const updatedProducts = products.map(p => {
      if (p.name === saleForm.name && p.quantity >= parseInt(saleForm.quantity)) {
        return { ...p, quantity: p.quantity - parseInt(saleForm.quantity) };
      }
      return p;
    });
    setProducts(updatedProducts);
    const soldItem = products.find(p => p.name === saleForm.name);
    if (soldItem) {
      setSales([...sales, {
        name: soldItem.name,
        quantity: parseInt(saleForm.quantity),
        total: parseFloat(soldItem.price) * parseInt(saleForm.quantity),
        profit: (parseFloat(soldItem.price) - parseFloat(soldItem.cost)) * parseInt(saleForm.quantity),
        date: new Date().toLocaleDateString()
      }]);
    }
    setSaleForm({ name: '', quantity: '' });
  };

  return (
    <div className="p-4 grid gap-4">
      <Card>
        <CardContent className="space-y-2">
          <h2 className="text-xl font-bold">Cadastrar Produto</h2>
          <div className="grid grid-cols-5 gap-2">
            <Input placeholder="Nome" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="Base" value={form.base} onChange={e => setForm({ ...form, base: e.target.value })} />
            <Input placeholder="Custo" value={form.cost} onChange={e => setForm({ ...form, cost: e.target.value })} />
            <Input placeholder="Preço" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
            <Input placeholder="Qtd" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
          </div>
          <Button onClick={addProduct}>Adicionar Produto</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2">
          <h2 className="text-xl font-bold">Registrar Venda</h2>
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="Nome do Produto" value={saleForm.name} onChange={e => setSaleForm({ ...saleForm, name: e.target.value })} />
            <Input placeholder="Quantidade" value={saleForm.quantity} onChange={e => setSaleForm({ ...saleForm, quantity: e.target.value })} />
          </div>
          <Button onClick={sellProduct}>Vender</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Estoque Atual</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Base</TableHead>
                <TableHead>Custo</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Qtd</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map(p => (
                <TableRow key={p.id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.base}</TableCell>
                  <TableCell>R$ {p.cost}</TableCell>
                  <TableCell>R$ {p.price}</TableCell>
                  <TableCell>{p.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Histórico de Vendas</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Qtd</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Lucro</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((s, i) => (
                <TableRow key={i}>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.quantity}</TableCell>
                  <TableCell>R$ {s.total.toFixed(2)}</TableCell>
                  <TableCell>R$ {s.profit.toFixed(2)}</TableCell>
                  <TableCell>{s.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

