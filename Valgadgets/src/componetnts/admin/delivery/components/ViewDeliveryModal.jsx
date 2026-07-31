import {
  X,
  Package,
  User,
  Phone,
  Mail,
  MapPin,
  Truck,
  CreditCard,
  Calendar,
  CheckCircle,
} from 'lucide-react';

export default function ViewDeliveryModal({
  open,
  onClose,
  delivery,
}) {
  if (!open || !delivery) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center p-5">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-5xl max-h-[95vh] overflow-y-auto">

        {/* Header */}

        <div className="flex justify-between items-center border-b p-6">
          <div>
            <h2 className="text-2xl font-bold">
              Delivery Details
            </h2>

            <p className="text-gray-500">
              Tracking #{delivery.tracking}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
            <X size={22} />
          </button>
        </div>

        <div className="p-6 space-y-8">

          {/* Summary */}

          <div className="grid md:grid-cols-4 gap-5">

            <div className="border rounded-2xl p-5">
              <Package className="text-[#2F4832]" />
              <p className="text-sm text-gray-500 mt-2">
                Delivery ID
              </p>
              <h3 className="font-bold text-lg">
                #{delivery.id}
              </h3>
            </div>

            <div className="border rounded-2xl p-5">
              <Truck className="text-blue-600" />
              <p className="text-sm text-gray-500 mt-2">
                Status
              </p>
              <h3 className="font-bold text-lg">
                {delivery.status}
              </h3>
            </div>

            <div className="border rounded-2xl p-5">
              <CreditCard className="text-green-600" />
              <p className="text-sm text-gray-500 mt-2">
                Delivery Fee
              </p>
              <h3 className="font-bold text-lg">
                ₦{delivery.fee?.toLocaleString()}
              </h3>
            </div>

            <div className="border rounded-2xl p-5">
              <Calendar className="text-orange-600" />
              <p className="text-sm text-gray-500 mt-2">
                Created
              </p>
              <h3 className="font-bold text-lg">
                {delivery.createdAt}
              </h3>
            </div>

          </div>

          {/* Customer */}

          <div className="border rounded-3xl p-6">

            <h3 className="font-bold text-xl mb-5">
              Customer Information
            </h3>

            <div className="grid md:grid-cols-2 gap-5">

              <div className="flex items-center gap-4">
                <User className="text-[#2F4832]" />

                <div>
                  <p className="text-gray-500 text-sm">
                    Customer
                  </p>

                  <h4 className="font-semibold">
                    {delivery.customer}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="text-[#2F4832]" />

                <div>
                  <p className="text-gray-500 text-sm">
                    Phone
                  </p>

                  <h4 className="font-semibold">
                    {delivery.phone}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="text-[#2F4832]" />

                <div>
                  <p className="text-gray-500 text-sm">
                    Email
                  </p>

                  <h4 className="font-semibold">
                    {delivery.email}
                  </h4>
                </div>
              </div>

            </div>

          </div>

          {/* Addresses */}

          <div className="grid lg:grid-cols-2 gap-6">

            <div className="border rounded-3xl p-6">

              <div className="flex gap-3">
                <MapPin className="text-green-600 mt-1" />

                <div>
                  <h3 className="font-bold">
                    Pickup Address
                  </h3>

                  <p className="text-gray-500 mt-2">
                    {delivery.pickup}
                  </p>
                </div>
              </div>

            </div>

            <div className="border rounded-3xl p-6">

              <div className="flex gap-3">
                <MapPin className="text-red-500 mt-1" />

                <div>
                  <h3 className="font-bold">
                    Delivery Address
                  </h3>

                  <p className="text-gray-500 mt-2">
                    {delivery.destination}
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Rider */}

          <div className="border rounded-3xl p-6">

            <h3 className="font-bold text-xl mb-5">
              Assigned Rider
            </h3>

            <div className="grid md:grid-cols-3 gap-6">

              <div>
                <p className="text-gray-500 text-sm">
                  Rider Name
                </p>

                <h4 className="font-bold mt-1">
                  {delivery.rider || 'Not Assigned'}
                </h4>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Rider Phone
                </p>

                <h4 className="font-bold mt-1">
                  {delivery.riderPhone || '--'}
                </h4>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Vehicle
                </p>

                <h4 className="font-bold mt-1">
                  {delivery.vehicle || 'Motorcycle'}
                </h4>
              </div>

            </div>

          </div>

          {/* Package */}

          <div className="border rounded-3xl p-6">

            <h3 className="font-bold text-xl mb-5">
              Package Details
            </h3>

            <div className="grid md:grid-cols-4 gap-5">

              <div>
                <p className="text-gray-500 text-sm">
                  Weight
                </p>

                <h4 className="font-bold">
                  {delivery.weight || '--'}
                </h4>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Dimensions
                </p>

                <h4 className="font-bold">
                  {delivery.dimensions || '--'}
                </h4>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Package Type
                </p>

                <h4 className="font-bold">
                  {delivery.packageType || '--'}
                </h4>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Insurance
                </p>

                <h4 className="font-bold">
                  {delivery.insured ? 'Yes' : 'No'}
                </h4>
              </div>

            </div>

          </div>

          {/* Timeline */}

          <div className="border rounded-3xl p-6">

            <h3 className="font-bold text-xl mb-5">
              Delivery Timeline
            </h3>

            <div className="space-y-5">

              <div className="flex gap-4">
                <CheckCircle className="text-green-600 mt-1" />

                <div>
                  <h4 className="font-semibold">
                    Order Created
                  </h4>

                  <p className="text-gray-500 text-sm">
                    {delivery.createdAt}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="text-green-600 mt-1" />

                <div>
                  <h4 className="font-semibold">
                    Rider Assigned
                  </h4>

                  <p className="text-gray-500 text-sm">
                    {delivery.assignedAt || '--'}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Truck className="text-blue-600 mt-1" />

                <div>
                  <h4 className="font-semibold">
                    Current Status
                  </h4>

                  <p className="text-gray-500 text-sm">
                    {delivery.status}
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Footer */}

          <div className="flex justify-end gap-4 pt-4">

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl border hover:bg-gray-100">
              Close
            </button>

            <button
              className="px-6 py-3 rounded-xl bg-[#2F4832] hover:bg-[#243927] text-white">
              Print Details
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

// js
//   {
//     id: 1001,
//     tracking: "VG2039485",
//     customer: "John Doe",
//     phone: "08012345678",
//     email: "john@gmail.com",

//     pickup: "Lekki Phase 1, Lagos",
//     destination: "Ikeja GRA, Lagos",

//     rider: "Samuel Johnson",
//     riderPhone: "08123456789",
//     vehicle: "Honda Motorcycle",

//     fee: 4500,
//     weight: "4.2kg",
//     dimensions: "45 × 30 × 18 cm",
//     packageType: "Electronics",
//     insured: true,

//     status: "In Transit",

//     createdAt: "2026-07-30 09:15 AM",
//     assignedAt: "2026-07-30 09:40 AM"
//   }
