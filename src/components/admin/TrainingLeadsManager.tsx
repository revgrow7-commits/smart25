import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Users, Mail, Phone, MapPin } from "lucide-react";

interface TrainingLead {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  profile: string;
  created_at: string;
}

const TrainingLeadsManager = () => {
  const [leads, setLeads] = useState<TrainingLead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("training_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching leads:", error);
    } else {
      setLeads(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const getProfileBadge = (profile: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      Montador: "default",
      Agência: "secondary",
      Empresa: "outline",
      Outro: "outline",
    };
    return <Badge variant={variants[profile] || "outline"}>{profile}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
            <Users className="h-5 w-5" />
            Leads da Escola de Treinamento
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {leads.length} inscrição(ões) recebida(s)
          </p>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          Nenhum lead cadastrado ainda.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead>Perfil</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        {lead.email}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {lead.whatsapp}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {lead.city}
                    </span>
                  </TableCell>
                  <TableCell>{getProfileBadge(lead.profile)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(lead.created_at)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Card>
  );
};

export default TrainingLeadsManager;
