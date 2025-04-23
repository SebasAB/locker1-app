"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PlusCircle,
  Users,
  Lock,
  Copy,
  Check,
  X,
  Edit,
  Trash,
  UserPlus,
  UserMinus,
  Share2,
  LogOut,
  Eye,
  Ban,
} from "lucide-react";

import { getPasswordStrength } from "@/lib/utils";

const initialGroups = [
  {
    id: 1,
    name: "Equipo de Desarrollo",
    members: 5,
    passwords: 10,
    lastUpdated: "2023-05-15",
    isOwner: true,
    description: "Grupo para compartir claves del equipo de desarrollo",
    membersList: [
      { id: 1, name: "Ana García", email: "ana@example.com" },
      { id: 2, name: "Carlos López", email: "carlos@example.com" },
    ],
    sharedPasswords: [
      {
        id: 1,
        service: "GitHub",
        username: "dev-team",
        password: "********",

        complexity: 85,
        strength: "Alta",
      },
      {
        id: 2,
        service: "AWS",
        username: "admin",
        password: "********",
        complexity: 92,
        strength: "Muy Alta",
      },
    ],
  },
  {
    id: 2,
    name: "Recursos Humanos",
    members: 3,
    passwords: 5,
    lastUpdated: "2023-05-10",
    isOwner: false,
    description: "Claves compartidas del departamento de RRHH",
    membersList: [
      { id: 3, name: "María Rodríguez", email: "maria@example.com" },
      { id: 4, name: "Juan Pérez", email: "juan@example.com" },
    ],
    sharedPasswords: [
      {
        id: 3,
        service: "ADP",
        username: "hr-team",
        password: "********",
        complexity: 78,
        strength: "Media",
      },
    ],
  },
  {
    id: 3,
    name: "Marketing",
    members: 4,
    passwords: 7,
    lastUpdated: "2023-05-12",
    isOwner: true,
    description: "Accesos compartidos para herramientas de marketing",
    membersList: [
      { id: 5, name: "Laura Sánchez", email: "laura@example.com" },
      { id: 6, name: "Pedro Gómez", email: "pedro@example.com" },
    ],
    sharedPasswords: [
      {
        id: 4,
        service: "Mailchimp",
        username: "marketing",
        password: "********",
        complexity: 88,
        strength: "Alta",
      },
      {
        id: 5,
        service: "Google Ads",
        username: "ads-manager",
        password: "********",
        complexity: 95,
        strength: "Muy Alta",
      },
    ],
  },
];

const pendingInvitations = [
  { id: 1, name: "Equipo de Ventas", invitedBy: "Laura Martínez" },
  { id: 2, name: "Soporte Técnico", invitedBy: "Carlos Rodríguez" },
];

const handleDeleteGroup = (id: number) => console.log("Eliminar grupo:", id);
const handleLeaveGroup = (id: number) => console.log("Abandonar grupo:", id);
const handleRemoveMember = (id: number) => console.log("Eliminar miembro:", id);
const handleUnsharePassword = (id: number) =>
  console.log("Dejar de compartir clave:", id);
const handleViewPasswordDetails = (password: any) => {
  console.log("Ver detalles de clave:", password);
};
const handleInvitation = (id: number, accept: boolean) => {
  console.log(`Invitación ${id}: ${accept ? "Aceptar" : "Rechazar"}`);
};

export default function GroupsPage() {
  const [groups, setGroups] = useState(initialGroups);

  const [selectedGroup, setSelectedGroup] = useState(
    groups.length > 0 ? groups[0] : null,
  );
  const [invitations, setInvitations] = useState(pendingInvitations);

  const [isNewGroupDrawerOpen, setIsNewGroupDrawerOpen] = useState(false);
  const [isEditGroupDrawerOpen, setIsEditGroupDrawerOpen] = useState(false);
  const [groupToEdit, setGroupToEdit] = useState<
    (typeof initialGroups)[0] | null
  >(null);
  const [isInviteMemberDrawerOpen, setIsInviteMemberDrawerOpen] =
    useState(false);
  const [isSharePasswordDrawerOpen, setIsSharePasswordDrawerOpen] =
    useState(false);
  const [isPasswordDetailsDrawerOpen, setIsPasswordDetailsDrawerOpen] =
    useState(false);
  const [selectedPassword, setSelectedPassword] = useState<any | null>(null);

  const ownedGroups = groups.filter((group) => group.isOwner);
  const invitedGroups = groups.filter((group) => !group.isOwner);

  const isLoading = false;

  return (
    <div className="flex justify-center w-full">
      <div className="container mx-auto space-y-8 px-4 py-8 max-w-8xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Grupos</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Gestiona tus grupos de contraseñas compartidas y colabora de forma
              segura
            </p>
          </div>
          <Button onClick={() => setIsNewGroupDrawerOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Grupo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <Card className="col-span-1 md:col-span-3">
            <CardHeader>
              <CardTitle>Lista de Grupos</CardTitle>
              <CardDescription>
                Selecciona un grupo para ver más detalles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                {isLoading ? (
                  <div>Cargando lista de grupos...</div>
                ) : (
                  <>
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">
                        Grupos que administras
                      </h3>
                      {ownedGroups.length > 0 ? (
                        ownedGroups.map((group) => (
                          <div key={group.id} className="mb-2">
                            <Button
                              variant={
                                selectedGroup?.id === group.id
                                  ? "secondary"
                                  : "ghost"
                              }
                              className="w-full justify-start"
                              onClick={() => setSelectedGroup(group)}
                            >
                              <span className="truncate">{group.name}</span>
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No administras ningún grupo.
                        </p>
                      )}
                    </div>
                    <Separator className="my-4" />
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">
                        Grupos a los que has sido invitado
                      </h3>
                      {invitedGroups.length > 0 ? (
                        invitedGroups.map((group) => (
                          <div key={group.id} className="mb-2">
                            <Button
                              variant={
                                selectedGroup?.id === group.id
                                  ? "secondary"
                                  : "ghost"
                              }
                              className="w-full justify-start"
                              onClick={() => setSelectedGroup(group)}
                            >
                              <span className="truncate">{group.name}</span>
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No has sido invitado a ningún grupo.
                        </p>
                      )}
                    </div>
                  </>
                )}
              </ScrollArea>

              {!isLoading && groups.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <p>No hay grupos disponibles.</p>
                  <Button
                    variant="link"
                    onClick={() => setIsNewGroupDrawerOpen(true)}
                  >
                    Crea un nuevo grupo
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="col-span-1 md:col-span-9">
            {selectedGroup ? (
              <Tabs defaultValue="details" className="w-full">
                <CardHeader className="pb-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{selectedGroup.name}</CardTitle>
                      <CardDescription className="mt-1.5">
                        {selectedGroup.description}
                      </CardDescription>
                    </div>

                    <TabsList>
                      <TabsTrigger value="details">Detalles</TabsTrigger>

                      {invitations.length > 0 && (
                        <TabsTrigger value="invitations">
                          Invitaciones ({invitations.length})
                        </TabsTrigger>
                      )}
                    </TabsList>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <TabsContent value="details" className="m-0">
                    <div className="grid gap-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 bg-muted/50 rounded-lg p-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            {selectedGroup.isOwner ? (
                              <>
                                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-sm">
                                  Administrador
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setGroupToEdit(selectedGroup);
                                    setIsEditGroupDrawerOpen(true);
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleDeleteGroup(selectedGroup.id)
                                  }
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </>
                            ) : (
                              <>
                                <Badge
                                  variant="secondary"
                                  className="bg-muted hover:bg-muted/80 text-sm"
                                >
                                  Invitado
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleLeaveGroup(selectedGroup.id)
                                  }
                                >
                                  <LogOut className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {selectedGroup.isOwner
                              ? "Tienes permisos completos para administrar este grupo"
                              : "Tienes acceso a las claves compartidas del grupo"}
                          </p>
                        </div>
                        <div className="flex items-center justify-around">
                          {" "}
                          <div className="text-center">
                            <Users className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
                            <p className="text-2xl font-semibold">
                              {selectedGroup.members}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Miembros
                            </p>
                          </div>
                          <div className="text-center">
                            <Lock className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
                            <p className="text-2xl font-semibold">
                              {selectedGroup.passwords}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Contraseñas
                            </p>
                          </div>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">
                            Miembros del Grupo
                          </h3>
                          {selectedGroup.isOwner && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setIsInviteMemberDrawerOpen(true)}
                            >
                              <UserPlus className="h-4 w-4 mr-2" />
                              Invitar
                            </Button>
                          )}
                        </div>
                        <Card>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead className="text-right">
                                  Acciones
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {selectedGroup.membersList.length > 0 ? (
                                selectedGroup.membersList.map((member) => (
                                  <TableRow key={member.id}>
                                    <TableCell>{member.name}</TableCell>
                                    <TableCell>{member.email}</TableCell>
                                    <TableCell className="text-right">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                          handleRemoveMember(member.id)
                                        }
                                        disabled={!selectedGroup.isOwner}
                                      >
                                        <UserMinus className="h-4 w-4" />
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell
                                    colSpan={3}
                                    className="text-center text-muted-foreground"
                                  >
                                    No hay miembros en este grupo.
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </Card>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">
                            Claves Compartidas
                          </h3>
                          {selectedGroup.isOwner && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setIsSharePasswordDrawerOpen(true)}
                            >
                              <Share2 className="h-4 w-4 mr-2" />
                              Compartir
                            </Button>
                          )}
                        </div>
                        <Card>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Servicio</TableHead>
                                <TableHead>Usuario</TableHead>
                                <TableHead>Contraseña</TableHead>
                                <TableHead>Complejidad</TableHead>
                                <TableHead>Acciones</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {selectedGroup.sharedPasswords.length > 0 ? (
                                selectedGroup.sharedPasswords.map(
                                  (password) => (
                                    <TableRow key={password.id}>
                                      <TableCell>{password.service}</TableCell>
                                      <TableCell>{password.username}</TableCell>
                                      <TableCell>
                                        {password.password}
                                      </TableCell>{" "}
                                      <TableCell>
                                        <Badge
                                          className={getPasswordStrength(
                                            password.strength,
                                          )}
                                        >
                                          {password.strength || "N/A"}{" "}
                                        </Badge>
                                      </TableCell>
                                      <TableCell>
                                        <div className="flex space-x-2">
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                              handleViewPasswordDetails(
                                                password,
                                              )
                                            }
                                          >
                                            <Eye className="h-4 w-4" />
                                          </Button>
                                          {selectedGroup.isOwner && (
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              onClick={() =>
                                                handleUnsharePassword(
                                                  password.id,
                                                )
                                              }
                                            >
                                              <Ban className="h-4 w-4" />
                                            </Button>
                                          )}
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  ),
                                )
                              ) : (
                                <TableRow>
                                  <TableCell
                                    colSpan={5}
                                    className="text-center text-muted-foreground"
                                  >
                                    No hay claves compartidas en este grupo.
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="invitations" className="m-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Invitaciones Pendientes</CardTitle>
                        <CardDescription>
                          Aprueba o rechaza las invitaciones a nuevos grupos
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {invitations.length > 0 ? (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Nombre del Grupo</TableHead>
                                <TableHead>Invitado por</TableHead>
                                <TableHead>Acciones</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {invitations.map((invitation) => (
                                <TableRow key={invitation.id}>
                                  <TableCell>{invitation.name}</TableCell>
                                  <TableCell>{invitation.invitedBy}</TableCell>
                                  <TableCell>
                                    <div className="flex space-x-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                          handleInvitation(invitation.id, true)
                                        }
                                      >
                                        <Check className="h-4 w-4 mr-1" />{" "}
                                        Aceptar
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                          handleInvitation(invitation.id, false)
                                        }
                                      >
                                        <X className="h-4 w-4 mr-1" /> Rechazar
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        ) : (
                          <p className="text-muted-foreground">
                            No tienes invitaciones pendientes.
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </CardContent>
              </Tabs>
            ) : (
              <div className="flex items-center justify-center h-[500px] text-muted-foreground">
                Selecciona un grupo de la lista para ver sus detalles.
              </div>
            )}
          </Card>
        </div>
      </div>
      <Drawer
        open={isNewGroupDrawerOpen}
        onOpenChange={setIsNewGroupDrawerOpen}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Crear Nuevo Grupo</DrawerTitle>
            <DrawerDescription>
              Completa los detalles para crear un nuevo grupo
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            {/*<GroupForm*/}
            {/*  onSubmit={handleCreateGroup}*/}
            {/*  onCancel={() => setIsNewGroupDrawerOpen(false)}*/}
            {/*/>*/}
          </div>
        </DrawerContent>
      </Drawer>
      <Drawer
        open={isEditGroupDrawerOpen}
        onOpenChange={setIsEditGroupDrawerOpen}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Editar Grupo</DrawerTitle>
            <DrawerDescription>
              Modifica los detalles del grupo
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            {/*{groupToEdit && (*/}
            {/*  <GroupForm*/}
            {/*    group={groupToEdit}*/}
            {/*    onSubmit={handleEditGroup}*/}
            {/*    onCancel={() => setIsEditGroupDrawerOpen(false)}*/}
            {/*  />*/}
            {/*)}*/}
          </div>
        </DrawerContent>
      </Drawer>
      <Drawer
        open={isInviteMemberDrawerOpen}
        onOpenChange={setIsInviteMemberDrawerOpen}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Invitar Nuevo Miembro</DrawerTitle>
            <DrawerDescription>
              Ingresa el correo electrónico del nuevo miembro para invitarlo al
              grupo
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            {/*<InviteMemberForm*/}
            {/*  onSubmit={handleInviteMember}*/}
            {/*  onCancel={() => setIsInviteMemberDrawerOpen(false)}*/}
            {/*/>*/}
          </div>
        </DrawerContent>
      </Drawer>
      <Drawer
        open={isSharePasswordDrawerOpen}
        onOpenChange={setIsSharePasswordDrawerOpen}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Compartir Contraseña</DrawerTitle>
            <DrawerDescription>
              Selecciona la contraseña que deseas compartir con el grupo
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            {/*<SharePasswordForm*/}
            {/*  passwords={selectedGroup.sharedPasswords}*/}
            {/*  onSubmit={handleSharePassword}*/}
            {/*  onCancel={() => setIsSharePasswordDrawerOpen(false)}*/}
            {/*/>*/}
          </div>
        </DrawerContent>
      </Drawer>
      <Drawer
        open={isPasswordDetailsDrawerOpen}
        onOpenChange={setIsPasswordDetailsDrawerOpen}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Detalles de la Contraseña</DrawerTitle>
            <DrawerDescription>
              Información detallada de la contraseña compartida
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            {/*{selectedPassword && (*/}
            {/*  <PasswordDetails*/}
            {/*    service={selectedPassword.service}*/}
            {/*    username={selectedPassword.username}*/}
            {/*    password={selectedPassword.password}*/}
            {/*    complexity={selectedPassword.complexity}*/}
            {/*  />*/}
            {/*)}*/}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
