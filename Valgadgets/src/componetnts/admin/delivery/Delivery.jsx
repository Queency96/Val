import { useMemo, useState } from 'react';

import DeliveryStats from './components/DeliveryStats';
import DeliveryFilters from './components/DeliveryFilters';
import DeliveryTable from './components/DeliveryTable';

import ViewDeliveryModal from './components/ViewDeliveryModal';
import AssignRiderModal from './components/AssignRiderModal';
import DeliveryTrackingModal from './components/DeliveryTrackingModal';
import CancelDeliveryModal from './components/CancelDeliveryModal';

export default function Delivery() {
  const [deliveries, setDeliveries] = useState([
    {
      id: 1001,
      tracking: 'VG2039485',
      customer: {
        name: 'John Doe',
        phone: '08012345678',
      },
      address: 'Lekki Phase 1, Lagos',
      rider: 'Samuel Rider',
      status: 'In Transit',
      payment: 'Paid',
      total: 245000,
      createdAt: '2026-07-25',
    },
    {
      id: 1002,
      tracking: 'VG2039486',
      customer: {
        name: 'Mary Johnson',
        phone: '08123456789',
      },
      address: 'Wuse 2, Abuja',
      rider: 'Not Assigned',
      status: 'Pending',
      payment: 'Pending',
      total: 860000,
      createdAt: '2026-07-26',
    },
    {
      id: 1003,
      tracking: 'VG2039487',
      customer: {
        name: 'David James',
        phone: '09012345678',
      },
      address: 'GRA, Port Harcourt',
      rider: 'Emmanuel Rider',
      status: 'Delivered',
      payment: 'Paid',
      total: 125000,
      createdAt: '2026-07-24',
    },
  ]);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');

  const [selectedDelivery, setSelectedDelivery] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);

  const filteredDeliveries = useMemo(() => {
    return deliveries.filter((delivery) => {
      const matchesSearch =
        delivery.customer.name.toLowerCase().includes(search.toLowerCase()) ||
        delivery.tracking.toLowerCase().includes(search.toLowerCase()) ||
        String(delivery.id).includes(search);

      const matchesStatus =
        status === 'All' ||
        delivery.status.toLowerCase() === status.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [deliveries, search, status]);

  const handlePrint = (delivery) => {
    window.print();
  };

  const handleStatusChange = (id, newStatus) => {
    setDeliveries((prev) =>
      prev.map((delivery) =>
        delivery.id === id ? { ...delivery, status: newStatus } : delivery,
      ),
    );
  };

  const handleDelete = (id) => {
    if (window.confirm('Cancel this delivery?')) {
      setDeliveries((prev) => prev.filter((delivery) => delivery.id !== id));
    }
  };

  return (
    <div className='space-y-6 p-6'>
      <DeliveryStats deliveries={deliveries} />

      <DeliveryFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <DeliveryTable
        deliveries={filteredDeliveries}
        onPrint={handlePrint}
        onStatusChange={handleStatusChange}
        onView={(delivery) => {
          setSelectedDelivery(delivery);
          setViewOpen(true);
        }}
        onAssign={(delivery) => {
          setSelectedDelivery(delivery);
          setAssignOpen(true);
        }}
        onTrack={(delivery) => {
          setSelectedDelivery(delivery);
          setTrackingOpen(true);
        }}
        onCancel={(delivery) => {
          setSelectedDelivery(delivery);
          setCancelOpen(true);
        }}
      />

      <ViewDeliveryModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        delivery={selectedDelivery}
      />

      <AssignRiderModal
        open={assignOpen}
        onClose={() => setAssignOpen(false)}
        delivery={selectedDelivery}
      />

      <DeliveryTrackingModal
        open={trackingOpen}
        onClose={() => setTrackingOpen(false)}
        delivery={selectedDelivery}
      />

      <CancelDeliveryModal
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        delivery={selectedDelivery}
        onConfirm={() => {
          if (selectedDelivery) {
            handleDelete(selectedDelivery.id);
          }
          setCancelOpen(false);
        }}
      />
    </div>
  );
}
